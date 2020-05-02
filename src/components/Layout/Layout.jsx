import { Sidebar } from '..';

export default ({ children }) => {
  return (
    <>
      <main id="swup">
        <Sidebar />
        {children}
      </main>
    </>
  );
};
