export default function handler(req, res) {
  // if (req.method === "GET") {
  //   res.status(200).json(res.data);
  // } else

  if (req.method === "POST") {
    res.status(200).json(req.body);
  }
}
