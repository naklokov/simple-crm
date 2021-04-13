import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "./__mocks__/matchMedia";
import "./__mocks__/location";
import "./__mocks__/uuid";
import "./__mocks__/react-router-dom";

configure({ adapter: new Adapter() });
