export default (req, res) => {
    res.status(200).json({ text: 'Hello, world!', id: req.query.id })
}
  