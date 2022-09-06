import {ConfirmableData, ConfirmableService} from "./confirmable.model";
import {StaticInjector} from "../static-injector";

export function Confirmable(parameters?: ConfirmableData) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {

    const originalMethod = descriptor.value
    let confirmationService: ConfirmableService;

    descriptor.value = async function (...args: any[]) {

      if(!confirmationService) {
        confirmationService = StaticInjector.injector.get(ConfirmableService);
      }

      const config = confirmationService.defaultConfirm();

      if (parameters) {
        Object.assign(config, parameters)
      }

      const res = await confirmationService.showConfirm(config)

      if (res.isConfirmed) {
        return originalMethod.apply(this, args)
      }
    }

    return descriptor;
  }
}
