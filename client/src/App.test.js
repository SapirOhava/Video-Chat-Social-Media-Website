import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from './store';


//good username & password
it("good login", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onPost('/api/auth').reply(200, { token: "1" });

  const formData = {
    email: 'sapir@gmail.com',
    password: '123456'
  };

  const { email, password } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password });

  try {
    res = (await axios.post('/api/auth', body, config)).data;
  }
  catch (err) {
    res = "wrong login"
  }

  expect(res).toEqual({ token: "1" });
})

//wrong password
it("bad login", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onPost('/api/auth').reply(200, { err: "Invalid Credentials" });

  const formData = {
    email: 'sapir@gmail.com',
    password: '123'
  };

  const { email, password } = formData;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password });
  try {
    res = (await axios.post('/api/auth', body, config)).data;
  }
  catch (err) {
    res = "wrong login"
  }

  expect(res).toEqual({ err: "Invalid Credentials" });
})

it("get user profile", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet('/api/profile/me').reply(200, { profile: "user" });

  try {
    res = (await axios.get('/api/profile/me')).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ profile: "user" });
})


it("get all profiles", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet('/api/profile/').reply(200, { profiles: [] });

  try {
    res = (await axios.get('/api/profile/')).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ profiles: [] });
})

//get('/user/:user_id'
it("get profile by user id", async () => {

  const userId = "607f1f837cefcd251429011a";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/user/${userId}`).reply(200, { profile: { "userId": "607f1f837cefcd251429011a" } });

  try {
    res = (await axios.get(`/user/${userId}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ profile: { "userId": "607f1f837cefcd251429011a" } });
})



it("get all messages in a conversation", async () => {

  const conversationId = "60943eb837e58c4a90d5a88c";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/messages/${conversationId}`).reply(200, { messages: [] });

  try {
    res = (await axios.get(`/api/messages/${conversationId}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ messages: [] });
})



it("get all groups of a given user", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet("/api/groups/myGroup").reply(200, { groups: ["humus", "webDevelopers"] });

  try {
    res = (await axios.get("/api/groups/myGroup")).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ groups: ["humus", "webDevelopers"] });
})


//get a groups by groups id 
it("get a group by its id ", async () => {

  const id = "607f238d7cefcd251429011c";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/groups/${id}`).reply(200, { group: { id: "607f238d7cefcd251429011c" } });

  try {
    res = (await axios.get(`/api/groups/${id}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ group: { id: "607f238d7cefcd251429011c" } });
})



//get all groups 
it("get all groups", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/groups/`).reply(200, { groups: [] });

  try {
    res = (await axios.get(`/api/groups/`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ groups: [] });
})


// Get all posts in a group
//:id - id of the group   
it("Get all posts in a group", async () => {

  const id = "607f238d7cefcd251429011c";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/posts/${id}`).reply(200, { posts: [] });

  try {
    res = (await axios.get(`/api/posts/${id}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ posts: [] });
})


//Get post by id of the post
//:id - id of the post   
it("Get post by id of the post", async () => {

  const postId = "607f2f9880a88812cc24a506";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/posts/post/${postId}`).reply(200, { post: "hi" });

  try {
    res = (await axios.get(`/api/posts/post/${postId}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ post: "hi" });
})


//get all the conversations of a user
it("get all conversations of a user", async () => {

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/conversations/`).reply(200, { conversations: [] });

  try {
    res = (await axios.get(`/api/conversations/`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ conversations: [] });
})


//get a conversation by its id
//:id - id of the conversation   
it("get a conversation by its id", async () => {

  const conversationId = "607f2f9880a88812cc24a506";
  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/conversations/${conversationId}`).reply(200, { conversation: [] });

  try {
    res = (await axios.get(`/api/conversations/${conversationId}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ conversation: [] });
})


// get conv includes two userId
it("get conv includes two userId", async () => {

  const firstUserId = "607f2f9880a88812cc24a5g5";
  const secondUserId = "607f2f9880a88812cc24a5g9";

  const fakeAxios = new MockAdapter(axios);
  let res = "init";
  fakeAxios.onGet(`/api/conversations/find/${firstUserId}/${secondUserId}`).reply(200, { conversation: [] });

  try {
    res = (await axios.get(`/api/conversations/find/${firstUserId}/${secondUserId}`)).data;
  }
  catch (err) {
    res = "err"
  }

  expect(res).toEqual({ conversation: [] });
})

//add post
it("add post", async () => {

  const newPost ="bla bla"
  const res = store.dispatch({
    type: "ADD_POST",
    payload: newPost
  });

  expect(res).toEqual({type: "ADD_POST",payload: newPost});
})


//add comment
it("add comment", async () => {

  const newComment ="bla bla"
  const res = store.dispatch({
    type: "ADD_COMMENT",
    payload: newComment
  });

  expect(res).toEqual({type: "ADD_COMMENT",payload: newComment});
})


//add like to post
it("add like to post", async () => {

  const res = store.dispatch({
    type: "ADD_LIKE",
    payload: null
  });

  expect(res).toEqual({type: "ADD_LIKE",payload: null});
})

//delete post
it("delete post", async () => {

  const PostId ="607f2f9880a88812cc24a506";
  const res = store.dispatch({
    type: "DELETE_POST",
    payload: PostId
  });

  expect(res).toEqual({type: "DELETE_POST",payload: PostId});
})