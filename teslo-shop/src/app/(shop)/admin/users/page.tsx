import { getAllUser } from '@/actions'
import { PaginationPage, Title } from '@/components'
import { redirect } from 'next/navigation'
import React from 'react'
import { UsersGrid } from './ui/UsersGrid'

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function UsersAdminPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const { ok, message, users = [], totalPages, currentPage } = await getAllUser({ page })

    if (!ok) return redirect('/auth/login')

    return (
        <>
            <Title title="Mantenimiento de usuarios" />            

            <UsersGrid
                users={users ?? []}
            />

            <PaginationPage
                totalPages={totalPages ?? 1}
            />
        </>
    )
}
