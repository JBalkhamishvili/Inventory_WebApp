export const namespaced = true

// TODO I`ve to make separate module for the axios calls


import axios from 'axios';
import router from "@/router";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Accept'] = 'application/json';

export const state = {
    users: {}
}

export const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    },

    ADD_USER(state, userData ){
        state.users.push(userData)
    },

    UPDATE_USERS( state, data ) {
        state.users.forEach( user => {
            if(user.id === data.id) {
                user.name = data.name;
                user.email = data.email;
                user.company_id = data.company_id,
                    user.id = data.id
            }
        });
    },
};

export const actions = {
    getUsers( { commit } ){
            return axios.get('api/users').then( response => {
                commit('SET_USERS', response.data);
            });
    },

    updateUsers( { commit }, data ){
        console.log(data)

        return axios
                .patch('api/users/'+data.id,
                    {
                        name: data.name ,
                        email: data.email,
                        company_id: data.company_id,
                        id: data.id
                    })
                .then( () => {
                commit('UPDATE_USERS', data);
                console.log('success')
                alert("Update Success")
            }).catch((error) => {
                console.log(error)
                alert("Update not sucessfull")
            })
    },

    createUsers( { dispatch }, data ){
            return axios.post('api/users', data).then( () => {
                dispatch('ADD_USER', data);
                console.log("successfully added User")
                alert("successfully added User")
                router.push({name: 'Users'}).catch( error => error );

            }).catch((error) => {
                console.log(error)
                alert("could not add User")
                console.log("could not add User")
                router.push({name: 'Users'}).catch( error => error );

            })
    },

    deleteUsers({ dispatch }, data) {
        axios.get("sanctum/csrf-cookie").then(() => {
            return axios.delete("api/users/" + data.id).then(() => {
                dispatch("getUsers", data.id);
            });
        });
    },
};