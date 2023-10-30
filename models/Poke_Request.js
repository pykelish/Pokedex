class Poke_Requests {
    static BASE_URL = "https://pokeapi.co/api/v2/";

    static async getAllPokemons(offset) {
        const response = await fetch(`${this.BASE_URL}/pokemon?limit=10&offset=${offset ?? 0}`);
        return await response.json();
    }

    static async getAllGenerations() {
        const response = await fetch(`${this.BASE_URL}/generation`);
        return await response.json()
    }

    static async getPokemonDetailsId(index) {
        const response = await fetch(`${this.BASE_URL}/pokemon/${index}`);
        return await response.json();
    }

    static async getGenerationDetailsId(index) {
        const response = await fetch(`${this.BASE_URL}/generation/${index}`);
        return await response.json();
    }

    static async getPokemonSpecieDetail(index) {
        const response = await fetch(`${this.BASE_URL}/pokemon-species/${index}`);
        return await response.json();
    }
}

export default Poke_Requests;