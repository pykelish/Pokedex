class Poke_Requests {
    BASE_URL = "https://pokeapi.co/api/v2/";

    static async getAllPokemons(offset) {
        const response = await fetch(`${BASE_URL}/pokemon?limit=10&offset=${offset ?? 0}`);
        setPokemons(await response.json());
    }

    static async getAllGenerations() {
        const response = await fetch(`${BASE_URL}/generation`);
        setPokemons(await response.json());
    }

    static async getPokemonDetailsId(index) {
        const response = await fetch(`${BASE_URL}/pokemon/${index}`);
        setPokemons(await response.json());
    }


}

export default Poke_Requests;