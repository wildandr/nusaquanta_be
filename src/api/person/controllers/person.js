"use strict";

/**
 * person controller
 */

// path: src/api/person/controllers/person.js

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::person.person", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const personEntity = await strapi.entityService.findOne(
      "api::person.person",
      id,
      query
    );
    if (!personEntity) {
      return ctx.notFound("Person not found");
    }

    const topRoles = await strapi.entityService.findMany(
      "api::project-team.project-team",
      {
        filters: { people: id },
        populate: { jobs: true },
      }
    );

    const jobCounts = topRoles.reduce((acc, team) => {
      team.jobs.forEach((job) => {
        acc[job.id] = (acc[job.id] || 0) + 1;
      });
      return acc;
    }, {});

    const sortedJobs = Object.entries(jobCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    const topJobIds = sortedJobs.map(([jobId]) => jobId);

    const jobsDetails = await Promise.all(
      topJobIds.map((jobId) =>
        strapi.entityService.findOne("api::job.job", jobId)
      )
    );

    const dataWithTopRoles = {
      ...personEntity,
      topRoles: jobsDetails,
    };

    return dataWithTopRoles;
  },

  async find(ctx) {
    const { query } = ctx;

    const peopleEntities = await strapi.entityService.findMany(
      "api::person.person",
      query
    );

    const peopleWithTopRoles = await Promise.all(
      peopleEntities.map(async (personEntity) => {
        const topRoles = await strapi.entityService.findMany(
          "api::project-team.project-team",
          {
            filters: { people: personEntity.id },
            populate: { jobs: true },
          }
        );

        const jobCounts = topRoles.reduce((acc, team) => {
          team.jobs.forEach((job) => {
            acc[job.id] = (acc[job.id] || 0) + 1;
          });
          return acc;
        }, {});

        const sortedJobs = Object.entries(jobCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
        const topJobIds = sortedJobs.map(([jobId]) => jobId);

        const jobsDetails = await Promise.all(
          topJobIds.map((jobId) =>
            strapi.entityService.findOne("api::job.job", jobId)
          )
        );

        return {
          ...personEntity,
          topRoles: jobsDetails,
        };
      })
    );

    return peopleWithTopRoles;
  },
}));
