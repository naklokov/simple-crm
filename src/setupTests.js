import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "./mocks/matchMedia";
import "./mocks/react-router-dom";

configure({ adapter: new Adapter() });
