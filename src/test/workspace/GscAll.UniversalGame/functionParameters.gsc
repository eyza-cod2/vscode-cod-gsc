main()
{
    // All ok, only hovers

    spawn();                            
    self spawn();                       

    thread spawn();                     
    self thread spawn();                


    self aCos();                        

    getAmmoCount("aaa");                


    spawn();                            
    spawn(0);                           
    spawn(0, 1);
    spawn(0, 1, 2);
    spawn(0, 1, 2, 3);
    spawn(0, 1, 2, 3, 4);
    spawn(0, 1, 2, 3, 4, 5);            
    spawn(0, 1, 2, 3, 4, 5, 6);         
    spawn(0, 1, 2, 3, 4, 5, 6, 7);      
}