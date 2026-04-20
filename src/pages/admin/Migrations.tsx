import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import MigrationPanel from '@/components/admin/MigrationPanel';

export default function MigrationsPage() {
  return (
    <AdminLayout title="Database Migrations">
      <MigrationPanel />
    </AdminLayout>
  );
}
