import { getPaginatedOrdes } from '@/actions'
import { OrdersGrid, PaginationPage, Title } from '@/components'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function OrdersAdminPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const { ok, orders, totalPages } = await getPaginatedOrdes({ page })


    if (!ok) return redirect('/auth/login')

    return (
        <>
            <Title title="Todas las ordenes" />

            <OrdersGrid orders={orders ?? []} />

            <PaginationPage
                totalPages={totalPages ?? 1}
            />
        </>
    )
}
