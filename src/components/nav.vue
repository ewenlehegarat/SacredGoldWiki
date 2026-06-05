<template>
    <nav>
        <ion-icon name="book-outline"></ion-icon>
        <div class="links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/pokemonList">Pokemon List</RouterLink>
            <RouterLink to="/encounters">Encounters</RouterLink>
            <RouterLink to="/fight">Fight</RouterLink>
            <RouterLink to="/item">Important Item</RouterLink>
            <RouterLink to="/event">Special Event</RouterLink>
        </div>
        <input type="checkbox" id="burger">
        <label for="burger">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <div class="dropdown_content">
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/pokemonList" @click="closeMenu">Pokemon List</RouterLink>
            <RouterLink to="/encounters" @click="closeMenu">Encounters</RouterLink>
            <RouterLink to="/fight" @click="closeMenu">Fight</RouterLink>
            <RouterLink to="/item" @click="closeMenu">Important Item</RouterLink>
            <RouterLink to="/event" @click="closeMenu">Special Event</RouterLink>
        </div>
    </nav>
</template>

<script setup>
    function closeMenu() {
        const burger = document.getElementById('burger')
        if (burger) {
            burger.checked = false
        }
    }
</script>

<style>
    nav {
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--Color-1);
        padding: 10px 15px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        z-index: 50;

        .links {
            display: none;
        }

        ion-icon {
            font-size: 30px;
            color: var(--Black);
        }

        input {
            width: 30px;
            height: 15px;
            position: absolute;
            top: 10px;
            right: 15px;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
        }

        label {
            width: 30px;
            height: 15px;
            position: relative;
            cursor: pointer;

            span {
                border-radius: 50px;
                position: absolute;
                background-color: var(--Black);
                width: 100%;
                height: 2.5px;
                left: 0;
                transition: 0.3s;
            }

            span:first-child {
                top: 0;
            }

            span:nth-child(2) {
                top: 50%;
            }

            span:nth-child(3) {
                top: 100%;
            }
        }

        .dropdown_content {
            border-top: 2px solid var(--Black);
            padding: 15px;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 15px;
            position: absolute;
            background-color: var(--Color-1);
            width: 100%;
            top: 50px;
            left: -100%;
            transition: left ease 300ms;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);

            a {
                font-size: 20px;
                font-weight: 600;
                text-decoration: none;
                cursor: pointer;
                color: var(--Black);
            }

            a:hover {
                color: rgb(77, 77, 77);
            }
        }

        a {
            color: var(--Black);
        }

        input:checked ~ .dropdown_content {
            left: 0;
        }

        input:checked ~ label span:first-child {
            transform: rotate(45deg);
            top: 6px;
        }

        input:checked ~ label span:nth-child(2) {
            opacity: 0;
        }

        input:checked ~ label span:nth-child(3) {
            transform: rotate(-45deg);
            top: 6px;
        }

        @media screen and (min-width: 768px) {
            justify-content: start;

            .links {
                display: flex;
                gap: 30px;
                margin-left: 50px;

                a {
                    position: relative;
                    text-decoration: none;
                    font-size: 20px;
                    color: var(--Black);
                    cursor: pointer;
                    transition: color ease-in-out 500ms;

                    &:hover {
                        color: var(--White);
                    }

                    &::after {
                        content: "";
                        position: absolute;
                        top: 34px;
                        left: 0;
                        width: 0;
                        height: 3px;
                        background-color: var(--White);
                        transition: width ease 400ms;
                    }

                    &:hover::after {
                        width: 100%;
                    }
                }
            }

            label {
                display: none;
            }

            .dropdown_content {
                display: none;
            }
        }
    }
</style>