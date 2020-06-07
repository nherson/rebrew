import { NextApiRequest, NextApiResponse } from 'next'
import Review from '../../../lib/models/review'
import uuid from '../../../lib/uuid'
import { ValidationError } from 'sequelize'
import { formatValidationError } from '../../../lib/errors'
import auth0 from '../../../lib/auth'

export default auth0.requireAuthentication(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        get(req, res)
    } else if (req.method === "POST") {
        post(req, res)
    } else {
        res.status(404).json({error: "not found"})
    }
})

const get = (req: NextApiRequest, res: NextApiResponse) => {
    Review.findAll().then(
        (reviews) => res.status(200).json(reviews)
    )
}

const post = (req: NextApiRequest, res: NextApiResponse) => {
    const review = new Review({
        id: uuid(),
        ...req.body,
    })
    review.
    save().
    then(
        (review) => res.status(200).json(review)
    ).catch(
        (err) => {
            if (err instanceof ValidationError) {
                res.status(400).json({errors: formatValidationError(err)})
            } else {
                // unknown error
                console.log(err)
                res.status(500).json({errors: ['internal server error']})
            }

        }
    )
}

