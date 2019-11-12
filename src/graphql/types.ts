export default `
scalar Long

type Dimensions {
  width: Long
  height: Long
}

type SceneMeta {
  size: Long
  duration: Int
  dimensions: Dimensions!
}

type ImageMeta {
  size: Long
  dimensions: Dimensions!
}

type Query {
  getImages: [Image]

  getSceneById(id: String!): Scene
  getScenes: [Scene]

  getActorById(id: String!): Actor
  findActors(name: String!): [Actor]
  getActors: [Actor]

  getLabelById(id: String!): Label
  findLabel(name: String!): Label
  getLabels: [Label]
}

type Actor {
  id: String!
  name: String!
  aliases: [String!]!
  addedOn: Long!
  bornOn: Long
  thumbnail: Image
  images: [Image!]!
  favorite: Boolean!
  bookmark: Boolean!
  rating: Int
  labels: [Label!]!
  scenes: [Scene!]
  #customFields
}

type Label {
  id: String!
  name: String!
  aliases: [String!]!
  addedOn: Long!
  thumbnail: Image
}

type Scene {
  id: String!
  name: String!
  addedOn: Long!
  releaseDate: String
  thumbnail: Image
  images: [Image!]!
  favorite: Boolean!
  bookmark: Boolean!
  rating: Int
  actors: [Actor!]!
  labels: [Label!]!
  streamLinks: [String!]!
  watches: [Long!]!
  meta: SceneMeta!
  #customFields
}

type Image {
  id: String!
  name: String!
  addedOn: Long!
  favorite: Boolean!
  bookmark: Boolean!
  rating: Int
  #customFields
  labels: [Label!]!
  meta: ImageMeta!
  scene: Scene
  actors: [Actor!]!
  thumbnail: Image
}

input ActorUpdateOpts {
  name: String
  rating: Int
  labels: [String!]
  aliases: [String!]
  thumbnail: String
  favorite: Boolean
  bookmark: Boolean
}

input ImageUpdateOpts {
  name: String
  rating: Int
  labels: [String!]
  actors: [String!]
  favorite: Boolean
  bookmark: Boolean
}

input LabelUpdateOpts {
  name: String
  aliases: [String!]
  thumbnail: String
}

input SceneUpdateOpts {
  favorite: Boolean
  bookmark: Boolean
  actors: [String!]
  name: String
  rating: Int
  labels: [String!]
  streamLinks: [String!]
  thumbnail: String
}

type Mutation {
  addActor(name: String!, aliases: [String!]): Actor
  updateActors(ids: [String!]!, opts: ActorUpdateOpts!): [Actor!]!
  removeActors(ids: [String!]!): Boolean

  uploadImage(file: Upload!, name: String, actors: [String!], labels: [String!], scene: String): Image
  updateImages(ids: [String!]!, opts: ImageUpdateOpts!): [Image!]!
  removeImages(ids: [String!]!): Boolean
  
  addLabel(name: String!, aliases: [String!]): Label
  updateLabels(ids: [String!]!, opts: LabelUpdateOpts!): [Label!]!
  removeLabels(ids: [String!]!): Boolean
  
  addScene(name: String!, actors: [String!], labels: [String!]): Scene
  uploadScene(file: Upload!, name: String, actors: [String!], labels: [String!]): Scene
  updateScenes(ids: [String!]!, opts: SceneUpdateOpts!): [Scene!]!
  removeScenes(ids: [String!]!): Boolean
}
`;