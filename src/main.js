import { header } from "../components/header/header.js"
header();

import { reports } from "../blocks/reports/reports.js"
reports();

import { useDynamicAdapt } from "./libraries/dynamicAdapt/dynamicAdapt.js";
useDynamicAdapt();

tippy("[data-tippy-content]");