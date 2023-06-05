import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongoDB } from "../../../lib/mongodb";
import mongoose from "mongoose";
import { error } from "console";
import { ICriteria } from "../../../types";
import Criterias from "../../../models/criterias";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch((err) => res.json(err));
  if (req.method === "POST") {
    const {
      criteria1,
      criteria2,
      criteria3,
      criteria4,
      criteria5,
      criteria6,
      criteria7,
      criteria8,
      criteria9,
      criteria10,
      criteria11,
      criteria12,
      criteria13,
      criteria14,
      criteria15,
    } = req.body;

    try {
      const criteria = await Criterias.create(
        {
          criteria1,
          criteria2,
          criteria3,
          criteria4,
          criteria5,
          criteria6,
          criteria7,
          criteria8,
          criteria9,
          criteria10,
          criteria11,
          criteria12,
          criteria13,
          criteria14,
          criteria15,
        },
        (error: unknown, data: ICriteria) => {
          if (error && error instanceof mongoose.Error.ValidationError) {
            //mongo db will return array
            // but we only want to show one error at a time

            for (let field in error.errors) {
              const msg = error.errors[field].message;
              return res.status(409).json({ error: msg });
            }
          }

          const criteria = {
            criteria1: data.criteria1,
            criteria2: data.criteria2,
            criteria3: data.criteria3,
            criteria4: data.criteria4,
            criteria5: data.criteria5,
            criteria6: data.criteria6,
            criteria7: data.criteria7,
            criteria8: data.criteria8,
            criteria9: data.criteria9,
            criteria10: data.criteria10,
            criteria11: data.criteria11,
            criteria12: data.criteria12,
            criteria13: data.criteria13,
            criteria14: data.criteria14,
            criteria15: data.criteria15,
          };
          return res.status(201).json({
            success: true,
            criteria,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "GET") {
    try {
      const criteriaList = await Criterias.find() ;
      return res.status(200).json({
        criteriaList,
      });
    } catch (error) {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
};

export default handler;
