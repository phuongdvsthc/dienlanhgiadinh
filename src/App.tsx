/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { CategoryListPage } from './pages/admin/CategoryListPage';
import { ProductListPage } from './pages/admin/ProductListPage';
import { AddProductPage } from './pages/admin/AddProductPage';
import { EditProductPage } from './pages/admin/EditProductPage';
import { AddCategoryPage } from './pages/admin/AddCategoryPage';
import { EditCategoryPage } from './pages/admin/EditCategoryPage';

import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <SiteSettingsProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/san-pham" element={<ProductsPage />} />
              <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
              <Route path="/bai-viet" element={<BlogPage />} />
              <Route path="/bai-viet/:slug" element={<BlogDetailPage />} />
              <Route path="/gioi-thieu" element={<AboutPage />} />
              <Route path="/lien-he" element={<ContactPage />} />
              <Route path="/admin/dang-nhap" element={<AdminLoginPage />} />
            </Route>

            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboardPage />} />
              <Route path="danh-muc" element={<CategoryListPage />} />
              <Route path="danh-muc/them" element={<AddCategoryPage />} />
              <Route path="danh-muc/:slug/sua" element={<EditCategoryPage />} />
              <Route path="san-pham" element={<ProductListPage />} />
              <Route path="san-pham/them" element={<AddProductPage />} />
              <Route path="san-pham/:slug/sua" element={<EditProductPage />} />
              <Route path="*" element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SiteSettingsProvider>
  );
}

