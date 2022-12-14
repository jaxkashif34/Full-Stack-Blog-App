// export const deleteUser = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   prisma.user
//     .delete({
//       where: {
//         id: userId,
//       },
//     })
//     .then(() => {
//       res.json({ message: 'User Deleted Successfully' });
//     })
//     .catch((err) => {
//       res.status(400).json({ error: err });
//     });
// };
