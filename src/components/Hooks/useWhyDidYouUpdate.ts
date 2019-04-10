import { useRef, useEffect } from "react";

type Props = {
  [key: string]: any;
}

const whyDidYouUpdate = (name: string, props: Props) => {
  const prevProps = useRef<Props>();

  useEffect(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...prevProps.current, ...props });

      if (keys.length === 0) {
        return;
      }

      const changesList: Props = {};

      keys.forEach((key: string) => {
        if ((prevProps.current as Props)[key] !== props[key]) {
          changesList[key] = {
            prev: (prevProps.current as Props)[key],
            next: props[key],
          };
        }
      });

      if (Object.keys(changesList).length) {
        console.log("[why did you update]", name, changesList);
      }
    }

    prevProps.current = props;
  });
};

export { whyDidYouUpdate };
