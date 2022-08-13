import { Time } from '@angular/common';

export class Tasks {
  id?: string;
  email?: string;
  password?: string;
  taskName?: string;
  listName?: string;
  date?: Date;
  time?: Time;
  file?: File;
  notes?: string;
  userId?: string;
}
