<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home </router-link>
            |
            <router-link v-if="$auth.isAuthenticated" to="/about">About</router-link>
            <div v-if="!$auth.loading">
                |
                <button @click="login" v-if="!$auth.isAuthenticated">
                    Login
                </button>
                |
                <button @click="loginPopup" v-if="!$auth.isAuthenticated">
                    Login Popup
                </button>
                |
                <button @click="logout" v-if="$auth.isAuthenticated">
                    Logout
                </button>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        loginPopup() {
            this.$auth.loginWithPopup();
        },
        logout() {
            this.$auth.logout();
            this.$router.push({ path: '/' });
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    display: flex;
    justify-content: center;
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 5px;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
