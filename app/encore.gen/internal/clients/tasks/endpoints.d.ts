import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { listTasks as listTasks_handler } from "../../../../api/tasks/task.api.js";
declare const listTasks: WithCallOpts<typeof listTasks_handler>;
export { listTasks };

import { getTask as getTask_handler } from "../../../../api/tasks/task.api.js";
declare const getTask: WithCallOpts<typeof getTask_handler>;
export { getTask };

import { createTask as createTask_handler } from "../../../../api/tasks/task.api.js";
declare const createTask: WithCallOpts<typeof createTask_handler>;
export { createTask };

import { updateTask as updateTask_handler } from "../../../../api/tasks/task.api.js";
declare const updateTask: WithCallOpts<typeof updateTask_handler>;
export { updateTask };

import { deleteTask as deleteTask_handler } from "../../../../api/tasks/task.api.js";
declare const deleteTask: WithCallOpts<typeof deleteTask_handler>;
export { deleteTask };


