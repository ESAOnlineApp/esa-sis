/* eslint-disable react/display-name */
/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\DropdownLink.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import Link from 'next/link';
import React from 'react';

// function LinkWrap({ children, refAs, ...props }, ref) {
//   if (refAs) {
//     props[refAs] = ref;
//   }
//   return (
//     <>
//       {React.isValidElement(children)
//         ? React.cloneElement(children, props)
//         : null}
//     </>
//   );
// }

// const LinkWrapper = React.forwardRef(LinkWrap);

// FIXME: Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

// const MyLink = React.forwardRef(({ onClick, href, children }, ref) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>
//       {children}
//       {/* click Me */}
//     </a>
//   );
// });

function DropdownLink(props) {
  let { href, children, ...rest } = props;
  return (
    // <Link href={href} passHref legacyBehavior>
    //   <MyLink>{children}</MyLink>
    // </Link>
    <Link href={href} {...rest}>
      {children}
    </Link>
  );

  // return (

  // <Link href={href} passHref legacyBehavior>
  //   <a {...rest}>{children}</a>
  // </Link>
  // <Link href={href}>
  //   <LinkWrapper refAs={href}>
  //     <a {...rest}>{children}</a>
  //   </LinkWrapper>
  // </Link>
  // <Link href={href} {...rest} >
  //   {children}
  // </Link>
  // <Link href={href} {...rest}>
  //     {children}
  //   </Link>
  // );
}
export default DropdownLink;
