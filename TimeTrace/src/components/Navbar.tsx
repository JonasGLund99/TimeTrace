// import something here

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Create mappings', href: '/create-mappings', current: false },
    { name: 'View log', href: '/view-log', current: false },
]

function classNames(...classes : String[]) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    return (
		<nav className="w-full p-4 bg-gray-800">
            <div className="flex space-x-4">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
        
    );
}
  

export default Navbar;
