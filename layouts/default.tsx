export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-default-layout h-full">
      <header className="bg-slate-500 text-gray-200 p-4 text-4xl font-extralight flex justify-center items-center">
        <h1>ATM Locations</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-slate-500 text-gray-200 text-center p-3">
        <p>A site by Christian Jensen for Drew Simonsen 😎</p>
      </footer>
    </div>
  )
}
