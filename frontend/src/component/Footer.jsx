import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-8">
            <div className="container mx-auto px-4">
                {/* name */}
                <p className="text-2xl font-bold  flex justify-center mb-10" >LeisureBookings.in</p>

                {/* Copyright Text */}
                <div className="text-center text-sm">
                    <p className="mb-4">
                        Copyright 2024 © LeisureBookings.in Pvt. Ltd. All Rights Reserved.
                    </p>
                    <p>
                        The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied.
                    </p>
                    <p className="mt-4">
                        Unauthorized use is prohibited and punishable by law.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;