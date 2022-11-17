// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "What's name of RGB script?",
    required: true,
  },
  {
    type: 'input',
    name: 'author',
    message: "What's your name?",
  },
  {
    type: 'select',
    name: 'acceptColors',
    message: 'Does it need to use the start and end colors or not?',
    choices: [
      {
        name: '0',
        hint: 'no colors are accepted/needed. The script will autonomously generate the colors for the matrix pixels',
      },
      {
        name: '1',
        hint: 'only the start color is needed by the script',
      },
      {
        name: '2',
        hint: 'both start and end colors will be accepted by the script',
      },
    ],
  },
  {
    type: 'confirm',
    name: 'isUseInitialState',
    message: 'Is the initial state of script used?',
    initial: true,
  },
  {
    type: 'confirm',
    name: 'isUseInitialMap',
    message: 'Is the initial map function used?',
    initial: true,
  },
];
