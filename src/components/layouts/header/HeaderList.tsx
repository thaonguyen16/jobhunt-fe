import React from "react";

type HeaderListProps = {
  children: React.ReactNode;
};

export default function HeaderList(props: HeaderListProps) {
  return (
    <>
    {props.children}
    </>
  );
}
