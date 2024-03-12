import { Link, useLocation } from "react-router-dom";

const navigation = [
    { name: 'Home', href: '/'},
    { name: 'Create mappings', href: '/create-mappings'},
    { name: 'View log', href: '/view-log'},
]

function classNames(...classes : String[]) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const { pathname } = useLocation();
    
    return (
		<nav className="w-full p-4 bg-gray-800">
            <div className="flex space-x-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                            pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-6 py-2 text-sm font-medium'
                        )}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
        
    );
}
  

export default Navbar;
