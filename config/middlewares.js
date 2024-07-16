module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://nusaquanta.com", 
        "https://www.nusaquanta.com", 
        "http://localhost:3000", 
        "http://localhost:3001",
      ],
      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
