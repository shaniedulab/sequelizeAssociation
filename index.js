const express = require('express')
const {Sequelize,  DataTypes} = require('sequelize');

const app = express()
const port = 3000


const sequelize = new Sequelize('jwt', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


//  User model
const User = sequelize.define('User', {
    name: DataTypes.STRING,
  });
  
  // Post model
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  const EduDetails = sequelize.define('EduDetails', {
    title: DataTypes.STRING,
    Photo: DataTypes.TEXT,
  });

  
  // Define the association
  User.hasMany(Post);
  User.hasMany(EduDetails);
  Post.belongsTo(User);
  EduDetails.belongsTo(User);


sequelize.sync()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user',(req,res) => {

  // Post.create({
  //   firstName: 'John',
  // })
  // .then((user) => {
  //   console.log(user.toJSON());
  // })
  // .catch((error) => {
  //   console.error('Error creating user:', error);
  // });

  // const user=User.findAll({ include: Post }).then((user1) => {
  //   console.log(user1);
  // }).catch((error) => {
  //   console.log(error.message);
  // })



//   const user=User.findAll({include: [{
//     model: Post,
//     // as: 'Posts' ,
//     // where: { title: 'dfgdg' }
//   },
  
//       // {
//       //   model: EduDetails
//       // }
// ], attributes: { exclude: ["createdAt", "updatedAt"] }
// }
// ).then((user1) => {
//     console.log(JSON.stringify(user1));
//   }).catch((error) => {
//     console.log(error.message);
//   })


const foo = User.findByPk(2, {
  include: [{
    model: Post,
  }]
}).then((f)=>{
f.getPosts().then((posts) => {
  console.log(posts);
})

})
.catch((error) => {
      console.log(error.message);
    })


})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// include: [ { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } }, ],

// attributes: [
//   'id',
//   'name',
//   [sequelize.col("College.name", "collegeName")]
// ],


// to include more than one model with include, you would add them to the include array.
// Let's say you had another association called Genre that you wanted to include with your Album query, it would look something like this:

// Album.findAll({
//   include: [
//     {
//       model: Artist,
//       as: 'Singer',
//     },
//     {
//       model: Genre
//     }
// ]



// If you have nested relations for example:

// Group.belongsTo(Invite)
// Invite.belongsTo(Issue)
// then your query looks like this:

// Issue.find({
//     include: [
//         {
//             model: Invite,
//             include: [Group]
//         }
//     ]
// });



// If you have nested relations for example:

// Group.belongsTo(Invite)
// Invite.belongsTo(Issue)
// then your query looks like this:

// Issue.find({
//     include: [
//         {
//             model: Invite,
//             include: [Group]
//         }
//     ]
// });
