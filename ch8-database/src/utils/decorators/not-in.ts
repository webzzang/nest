import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

//데코레이터의 인자는 객체에서 참조하려고 하는 다른 속성의 이름과 ValidationOptions를 받습니다.
export function NotIn(property: string, validationOptions?: ValidationOptions) {
  // registerDecorator를 호출하는 함수를 리턴합니다. 이 함수의 인자로 데코레이터가 선언될 객체와 속성이름을 받습니다.
  return (object: Object, propertyName: string) => {
    //registerDecorator함수는 ValidationDecoratorOptions 객체를 인자로 받습니다.
    registerDecorator({
      name: 'NotIn', //데코레이터의 이름을 NotIn으로 합니다.
      target: object.constructor, //이 데코레이터는 객체가 생성될 때 적용됩니다.
      propertyName,
      options: validationOptions,//또 유효성 옵션은 데코레이터의 인자로 전달받은 것을 사용합니다.
      constraints: [property],//이 데코레이터는 속성에 적용되도록 제약을 주었습니다.
      validator: {//가장 중요한 유효성 검사 규칙이 validator 속성에 기술됩니다. 이는 ValidatorConstraintInterface를 구현한 함수입니다.
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && typeof relatedValue === 'string' &&
            !relatedValue.includes(value);
        }
      },
    });
  };
}