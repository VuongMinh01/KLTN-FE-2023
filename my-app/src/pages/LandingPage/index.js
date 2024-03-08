import React, { useEffect } from 'react'
import Header from '../../component/LandingPageComponent/Header'
import Footer from '../../component/LandingPageComponent/Footer'
import LandingPageContent from '../../component/LandingPageComponent/LandingPageContent'

export default function LandingPage() {
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <LandingPageContent />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}