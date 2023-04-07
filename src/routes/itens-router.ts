import Router from "express";
import Item from "../models/Item";
import itensRepository from "../repositories/itens-repository";

const itensRouter = Router();

itensRouter.post("/itens", (req, res) => {
  const item: Item = req.body;
  itensRepository.create(item, (id) => {
    if (id) {
      res.status(201).location(`/itens/${id}`).send();
    } else {
      res.status(404).send();
    }
  });
});

itensRouter.get("/itens", (req, res) => {
  itensRepository.readAll((itens) => res.json(itens));
});

itensRouter.get("/itens/:id", (req, res) => {
  const id: number = +req.params.id;
  itensRepository.read(id, (item) => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).send();
    }
  });
});

itensRouter.put("/itens/:id", (req, res) => {
  const id: number = +req.params.id;
  itensRepository.update(id, req.body, (notFound) => {
    if(notFound){
        res.status(404).send();
    } else {
        res.status(204).send();
    }
  })
});

itensRouter.delete("/itens/:id", (req, res) => {
    const id: number = +req.params.id;
    itensRepository.exclude(id, (notFound) => {
      if(notFound){
          res.status(404).send();
      } else {
          res.status(204).send();
      }
    })
});

export default itensRouter;
