import axios from 'axios'

export const login = (params) => {
  try {
    return axios.post('/user/login.do',
      params)
  } catch (e) {
    console.error(e);
  }
}

export const loginOut = (params) => {
  try {
    return axios.post('/user/logout.do',
      params)
  } catch (e) {
    console.error(e);
  }
}

export const forgetGetQuestion = (params) => {
  try {
    return axios.post('/user/forgetGetQuestion.do',
      params)
  } catch (e) {
    console.error(e);
  }
}


export const register = (params) => {
  try {
    return axios.post('/user/register.do',
      params)
  } catch (e) {
    console.error(e);
  }
}

export const forgetCheckAnswer = (params) => {
  try {
    return axios.post('/user/forgetCheckAnswer.do',
      params)
  } catch (e) {
    console.error(e);
  }
}
export const forgetResetPassword = (params) => {
  try {
    return axios.post('/user/forgetResetPassword.do',
      params)
  } catch (e) {
    console.error(e);
  }
}

export const get_information = (params) => {
  try {
    return axios.post('/user/get_information.do',
      params)
  } catch (e) {
    console.error(e);
  }
}

export const getProductList = (params) => axios.get('/product/list.do', {params});

export const get_deep_category = (params) => axios.get('/manage/category/get_deep_category.do', {params});

export const get_category = (params) => axios.get('/manage/category/get_category.do', {params});

export const add_category = (params) => axios.get('/manage/category/add_category.do', {params});

export const set_category_name = (params) => axios.get('/manage/category/set_category_name.do', {params});

export const get_product_list = (params) => axios.get('/manage/product/list.do', {params});


