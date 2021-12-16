export class BadRequest extends Error {
  code = 400
  constructor(message){
    super(message);
  }
}