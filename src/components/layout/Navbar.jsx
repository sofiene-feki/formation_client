"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import logo from "../../assets/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ User Firebase (juste pour la session)
  const [firebaseUser, setFirebaseUser] = useState(null);

  // ✅ User MongoDB (redux)
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "guest";

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Vérifie session Firebase
  useEffect(() => {
    // console.log("🔍 Checking Firebase auth state...", user);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Déconnexion Firebase + reset
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // ✅ Navigation dynamique selon rôle
  const navLinks = {
    guest: [
      { name: "Accueil", path: "/" },
      { name: "Cours", path: "/courses" },
      { name: "À propos", path: "/about" },
    ],
    student: [
      { name: "Accueil", path: "/" },
      { name: "Mes cours", path: "/my-courses" },
      { name: "Explorer", path: "/courses" },
      { name: "Profil", path: "/profile" },
    ],
    instructor: [
      { name: "Tableau de bord", path: "/instructor/dashboard" },
      { name: "Créer un cours", path: "/instructor/create" },
      { name: "Mes cours", path: "/instructor/courses" },
    ],
    admin: [
      { name: "Admin Dashboard", path: "/admin" },
      { name: "Utilisateurs", path: "/admin/users" },
      { name: "Cours", path: "/admin/courses" },
      { name: "Analytics", path: "/admin/analytics" },
    ],
  };

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg">Learnify</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              {navLinks[role]?.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.path}
                      className="hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* AUTH */}
              <NavigationMenuItem>
                {firebaseUser ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-700">
                      {user?.firstName || firebaseUser.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="flex items-center gap-1"
                    >
                      <LogOut size={16} /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/login">
                      <Button variant="outline" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm">Register</Button>
                    </Link>
                  </div>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {mobileOpen && (
            <div className="absolute top-16 right-4 bg-background shadow-md rounded-md p-4 w-56 flex flex-col space-y-2">
              {navLinks[role]?.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* AUTH MOBILE */}
              {firebaseUser ? (
                <>
                  <div className="text-sm text-gray-600 px-2">
                    {user?.firstName || firebaseUser.email}
                  </div>
                  <Button onClick={handleLogout} className="w-full mt-2">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full mt-2">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full mt-2">Register</Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
