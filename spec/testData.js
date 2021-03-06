// User Schema
// {
//   first: String,
//   last: String,
//   username: String,
//   email: String,
//   password: String,
//   points: Number,
//   level: Number
// }
// Adventure Schema
// {
//   title: String,
//   creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   adventure: [{
//     riddle: String,
//     answer: String,
//     location: String,
//     longitude: Number, // Maybe number, depends on google api
//     latitude: Number, // Maybe number, depends on google api
//     photo: String
//   }],
//   date: { type: Date, default: Date.now() },
//   completedAll: { type: Boolean, default: false },
//   startingLocation: String
// }
// UserAdventure Combo Schema
// {
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   adventureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adventure' },
//   completion: [],
//   completed: { type: Boolean, default: false },
//   date: { type: Date, default: Date.now() }
// }

var data = {
  jack: {
    first: "Jack",
    last: "Ripper",
    username: "jr",
    email: "jack@jack.com",
    password: "123"
  },
  jill: {
    first: "Jill",
    last: "Sur",
    username: "js",
    email: "jill@jill.com",
    password: "123"
  },
  adventure: {
    title: "title",
    adventure: [],
    startingLocation: 'Starting Location'
  },
  riddle: {
    riddle: "Answer is 'answer'",
    answer: "answer",
    longitude: 1,
    latitude: 1
  },
  form: {
    "title":"Mike Test 2",
    "adventure":[{
      "riddle":"a",
      "answer":"a",
      "latitude":37.75824390870178,
      "longitude":-122.4506575289048
    },
    {
      "riddle":"a",
      "answer":"a",
      "latitude":37.75581431139383,
      "longitude":-122.4497536908402
    },
    {
      "riddle":"a",
      "answer":"a",
      "latitude":37.74595218552823,
      "longitude":-122.4269769716124
    }],
    "startingLocation":"Where else"
  }
}

module.exports = data;
