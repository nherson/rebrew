import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { guidelines } from "../../../lib/bjcp";
import { ciders, meads } from "../../../lib/mead";

const errInvalidStyleCode = { error: "invalid bjcp style code" };
const styleCodeRegExp = new RegExp("^[MmCc]?[0-9]+[A-Za-z]$");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await get(req, res);
  } else {
    res.status(404).json({ error: "not found" });
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  let code = (req.query.code as string).toUpperCase();
  const leadChar = code.charAt(0);

  if (!styleCodeRegExp.test(code)) {
    res.status(400).json(errInvalidStyleCode);
    return;
  }

  let guideline: any | null;

  const numeric = new RegExp("^[1-9]$"); // no 0 because the code shouldn't lead with 0
  if (leadChar === "M") {
    guideline = mead(code);
  } else if (leadChar === "C") {
    guideline = cider(code);
  } else if (numeric.test(leadChar)) {
    guideline = beer(code);
  }

  if (guideline === null) {
    res.status(404).json({ error: "style not found" });
  } else {
    res.status(200).json(guideline);
  }
};

const beer = (code: string): any | null => {
  const categoryNumber = +code.substring(0, code.length - 1);
  const subcategoryLetter = code.charAt(code.length - 1);

  const category = _.find(guidelines.beers, { number: categoryNumber });
  if (_.isNil(category)) {
    return null;
  }

  const subcategory = _.find(category.subcategories, {
    letter: subcategoryLetter,
  });
  if (_.isNil(subcategory)) {
    return null;
  }

  return subcategory;
};

const mead = (code: string): any | null => {
  const categoryNumber = +code.substring(1, code.length - 1);
  const subcategoryLetter = code.charAt(code.length - 1);

  const category = _.find(guidelines.meads, { number: categoryNumber });
  if (_.isNil(category)) {
    return null;
  }

  const subcategory = _.find(category.subcategories, {
    letter: subcategoryLetter,
  });
  if (_.isNil(subcategory)) {
    return null;
  }

  return subcategory;
};

const cider = (code: string): any | null => {
  const categoryNumber = +code.substring(1, code.length - 1);
  const subcategoryLetter = code.charAt(code.length - 1);

  const category = _.find(guidelines.ciders, { number: categoryNumber });
  if (_.isNil(category)) {
    return null;
  }

  const subcategory = _.find(category.subcategories, {
    letter: subcategoryLetter,
  });
  if (_.isNil(subcategory)) {
    return null;
  }

  return subcategory;
};
