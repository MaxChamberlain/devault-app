import { useState } from 'react';
import { loadingRoot } from '..';

export default function useLoading(){
    // eslint-disable-next-line
    const [ loading, setLoading ] = useState(null);

    if(loading == null) loadingRoot.render(<div></div>);
    else{

        if(loading[0] === 'loading'){
            loadingRoot.render(
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        backgroundColor: '#ffaa00',
                        filter: 'contrast(0.8)',
                        boxShadow: '0 0 10px black',
                        zIndex: 99999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: 30,
                        opacity: 0.9,
                    }}
                >
                    {loading[1] ? loading[1] : 'Loading...'}
                </div>
            )
        }
        if(loading[0] === 'error'){
            loadingRoot.render(
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        backgroundColor: '#ff3838',
                        filter: 'contrast(0.8)',
                        boxShadow: '0 0 10px black',
                        zIndex: 99999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: 30,
                        opacity: 0.9,
                    }}
                >
                    {loading[1] ? loading[1] : 'Error, please try again.'}
                </div>
            )
        }
        if(loading[0] === 'success'){
            loadingRoot.render(
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        backgroundColor: '#32a852',
                        filter: 'contrast(0.8)',
                        boxShadow: '0 0 10px black',
                        zIndex: 99999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: 30,
                        opacity: 0.9,
                    }}
                >
                    {loading[1] ? loading[1] : 'Success!'}
                </div>
            )
        }
        if(!loading){
           loadingRoot.render(<div></div>)
        }
    }
    return(setLoading);
}