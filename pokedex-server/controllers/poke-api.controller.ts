import axios, { AxiosRequestConfig } from 'axios';

class PokeApiController {

  getPokemons = async (req: any, res: any) => {
    try {
      let config: AxiosRequestConfig = {};
      if (Object.keys(req.query).length > 0) {
        config = { params: { offset: req.query.offset, limit: req.query.limit } };
      }
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', config);
      res.status(200).send(response.data);
    } catch (err) {
      res.status(503).send({ error: err.message });
    }
  }

  getPokemon = async (req: any, res: any) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
      res.status(200).send(response.data);
    } catch (err) {
      res.status(503).send({ error: err.message });
    }
  }

  getTypes = async (req: any, res: any) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${req.params.type}`);
      res.status(200).send(response.data);
    } catch (err) {
      res.status(503).send({ error: err.message });
    }
  }

}

export default PokeApiController;
