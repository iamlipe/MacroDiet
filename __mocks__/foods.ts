import { IFood } from '@services/firebase/models/food';

interface FoodsData {
  data: IFood[];
}

export const foods: FoodsData = {
  data: [
    {
      id: '001',
      name: 'Arroz Branco',
      info: {
        kcalPerGram: 1.42,
        protPerGram: 0.03,
        carbPerGram: 0.29,
        fatPerGram: 0,
        sodiumPerGram: 0,
        fiberPerGram: 0.02,
      },
    },
    {
      id: '002',
      name: 'Feijão Preto',
      info: {
        kcalPerGram: 1.55,
        protPerGram: 0.08,
        carbPerGram: 0.22,
        fatPerGram: 0.01,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.06,
      },
    },
    {
      id: '003',
      name: 'Frango Grelhado',
      info: {
        kcalPerGram: 2.29,
        protPerGram: 0.25,
        carbPerGram: 0,
        fatPerGram: 0.15,
        sodiumPerGram: 0.001,
        fiberPerGram: 0,
      },
    },
    {
      id: '004',
      name: 'Salada de Alface',
      info: {
        kcalPerGram: 0.16,
        protPerGram: 0.01,
        carbPerGram: 0.03,
        fatPerGram: 0,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.01,
      },
    },
    {
      id: '005',
      name: 'Salmão Grelhado',
      info: {
        kcalPerGram: 2.97,
        protPerGram: 0.25,
        carbPerGram: 0,
        fatPerGram: 0.21,
        sodiumPerGram: 0.001,
        fiberPerGram: 0,
      },
    },
    {
      id: '006',
      name: 'Batata Frita',
      info: {
        kcalPerGram: 3.36,
        protPerGram: 0.05,
        carbPerGram: 0.24,
        fatPerGram: 0.22,
        sodiumPerGram: 0.0001,
        fiberPerGram: 0.02,
      },
    },
    {
      id: '007',
      name: 'Hambúrguer',
      info: {
        kcalPerGram: 3.19,
        protPerGram: 0.16,
        carbPerGram: 0.12,
        fatPerGram: 0.23,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.01,
      },
    },
    {
      id: '008',
      name: 'Pizza de Pepperoni',
      info: {
        kcalPerGram: 3.27,
        protPerGram: 0.14,
        carbPerGram: 0.15,
        fatPerGram: 0.19,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.01,
      },
    },

    {
      id: '009',
      name: 'Cenoura Cozida',
      info: {
        kcalPerGram: 0.35,
        protPerGram: 0.01,
        carbPerGram: 0.08,
        fatPerGram: 0,
        sodiumPerGram: 0.002,
        fiberPerGram: 0.03,
      },
    },
    {
      id: '010',
      name: 'Salada de Frutas',
      info: {
        kcalPerGram: 0.56,
        protPerGram: 0.01,
        carbPerGram: 0.15,
        fatPerGram: 0,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.02,
      },
    },
    {
      id: '011',
      name: 'Lasanha de Carne',
      info: {
        kcalPerGram: 2.42,
        protPerGram: 0.1,
        carbPerGram: 0.16,
        fatPerGram: 0.16,
        sodiumPerGram: 0.002,
        fiberPerGram: 0.01,
      },
    },
    {
      id: '012',
      name: 'Macarrão com Queijo',
      info: {
        kcalPerGram: 3.22,
        protPerGram: 0.12,
        carbPerGram: 0.19,
        fatPerGram: 0.23,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.01,
      },
    },
    {
      id: '013',
      name: 'Banana',
      info: {
        kcalPerGram: 0.89,
        protPerGram: 0.01,
        carbPerGram: 0.23,
        fatPerGram: 0,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.03,
      },
    },

    {
      id: '014',
      name: 'Bife de Frango Grelhado',
      info: {
        kcalPerGram: 1.34,
        protPerGram: 0.28,
        carbPerGram: 0,
        fatPerGram: 0.03,
        sodiumPerGram: 0.006,
        fiberPerGram: 0,
      },
    },
    {
      id: '015',
      name: 'Sopa de Legumes',
      info: {
        kcalPerGram: 0.25,
        protPerGram: 0.01,
        carbPerGram: 0.06,
        fatPerGram: 0,
        sodiumPerGram: 0.003,
        fiberPerGram: 0.02,
      },
    },
    {
      id: '016',
      name: 'Pizza de Mussarela',
      info: {
        kcalPerGram: 2.75,
        protPerGram: 0.12,
        carbPerGram: 0.17,
        fatPerGram: 0.2,
        sodiumPerGram: 0.003,
        fiberPerGram: 0.01,
      },
    },
    {
      id: '017',
      name: 'Pão de Queijo',
      info: {
        kcalPerGram: 3.09,
        protPerGram: 0.07,
        carbPerGram: 0.29,
        fatPerGram: 0.21,
        sodiumPerGram: 0.001,
        fiberPerGram: 0,
      },
    },
    {
      id: '018',
      name: 'Torta de Maçã',
      info: {
        kcalPerGram: 2.47,
        protPerGram: 0.02,
        carbPerGram: 0.25,
        fatPerGram: 0.16,
        sodiumPerGram: 0.001,
        fiberPerGram: 0.02,
      },
    },
  ],
};