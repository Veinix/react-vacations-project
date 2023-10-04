import React from 'react'
export default function Footer(): JSX.Element {
  return (
    <div className="p-2 text-white mx-auto">
        <h1 className="text-2xl">Footer</h1>
        <div className="flex">
            <div className="flex-grow flex flex-col">
                <a href="/#home">Fizz</a>
                <a href="#">Bazz</a>
                <a href="#">Foo</a>
                <a href="#">Bar</a>
            </div>
            <div className="flex-grow flex flex-col">
                <a href="#">Foo</a>
                <a href="#">Bar</a>
            </div>
            <div className="flex-grow flex flex-col">
                <a href="#">Bazz</a>
                <a href="#">Foo</a>
                <a href="#">Bar</a>
            </div>
            <div className="flex-grow flex flex-col">
                <a href="/#home">Fizz</a>
                <a href="#">Bazz</a>
                <a href="#">Foo</a>
                <a href="#">Bar</a>
            </div>
        </div>
        <div className="text-right text-xs py-4">
            <a href="">&copy;2023 Do I have copyright over this work?</a>
        </div>
    </div>
    
  )
}