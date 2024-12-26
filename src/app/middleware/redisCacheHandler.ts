import { RequestHandler } from "express";
import { redisClient } from "../../server";

export const handleRedisCache: RequestHandler = (req, res, next) => {
  const key = req.originalUrl;
  console.log(key, "key");
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error("Error getting data from Redis:", err);
      next();
    } else if (data) {
      const parsedData = JSON.parse(data);
      res.send({
        success: true,
        statusCode: 200,
        message: "Doc retrieved successfully",
        data: parsedData,
      });
    } else {
      // Fetch data from the database

      // store in redis
      next();
    }
  });
};
