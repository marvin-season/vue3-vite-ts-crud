import { Machine, interpret } from 'xstate';

const mapMachine = Machine({
  initial: 'province',
  states: {
    province: {
      on: {
        SWITCH_TO_CITY: 'city',
      },
    },
    city: {
      on: {
        SWITCH_TO_PROVINCE: 'province',
        SWITCH_TO_DISTRICT: 'district',
      },
    },
    district: {
      on: {
        SWITCH_TO_CITY: 'city',
        SWITCH_TO_COUNTY: 'county',
      },
    },
    county: {
      on: {
        SWITCH_TO_DISTRICT: 'district',
      },
    },
  },
});


export const mapService = interpret(mapMachine);