import { ComponentType } from "react";

declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const sleep = function sleep(time: number = 1000): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * 严格模式下,组件可选属性的类型其实是联合类型 `undefined | string`,后续使用编译器就会抛出错误
 * 虽然为组件定义的 `defaultProps` 但是编译器并不知道
 *
 * @param defaultProps
 * @param Component
 */
const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Component: ComponentType<P>,
) => {
  type RequiredProps = Omit<P, keyof DP>;
  type Props = Partial<DP> & Required<RequiredProps>;

  Component.defaultProps = defaultProps;

  return (Component as ComponentType<any>) as ComponentType<Props>;
};

const isFunction = (value: any): boolean => typeof value === "function";

export { sleep, withDefaultProps, isFunction };
