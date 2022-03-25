import {
  MantineProvider,
  Global,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import React from "react";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";

interface StylesWrapperProps {}

const StylesWrapper: React.FC<StylesWrapperProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: "Greycliff CF ,sans-serif",
          colorScheme,
          headings: { fontFamily: "Greycliff CF, sans-serif" },
        }}
      >
        <Global
          styles={(theme) => ({
            body: {
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[1]
                  : theme.colors.gray[8],
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
            },
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
export default StylesWrapper;
