export default {
    PORT: +(process.env["PORT"] || 4000),
    rootServiceUrl: "http://localhost:4000/",
    jwtSecret: process.env["jwtSecret"] || "instadsappsupersecret",
    databaseUrl: process.env["MONGODB_URI"] || "mongodb://localhost/insta-ads-dev",
    oAuth: {
        facebook: {
            appId: process.env["facebookAppId"] || "992652077772172",
            secret: process.env["facebookAppSecret"] || "d95cfb3b113892ae7e7f2ff225a52400",
        },
        instagram:{
            appId: process.env["instagramAppId"] || "2729029260491874",
            secret: process.env["instagramAppSecret"] || "d63f9e511745432bd0a7d6fae0ddd8b8",
        },
        google: {
            appId: process.env["googleAppId"] || "322429043104-g7p2h5vp2ufqf2j4fhhgknh5mbuvma60.apps.googleusercontent.com",
            secret: process.env["googleAppId"] || "w8mkt6TAZMFQwjAtfOryAUJ9"
        }
    }

};
