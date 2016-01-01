use std::error::Error;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn get_data() -> String {
    let path = Path::new("src/input.txt");
    let display = path.display();

    // Open the path in read-only mode, returns `IoResult<File>`
    let mut file = match File::open(&path) {
        // The `desc` field of `IoError` is a string that describes the error
        Err(why) => panic!("couldn't open {}: {}", display,
                                                   Error::description(&why)),
        Ok(file) => file,
    };

    // Read the file contents into a string, returns `IoResult<String>`
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display,
                                                   Error::description(&why)),
        //Ok(_) => print!("{} contains:\n{}", display, s),
        Ok(_) => return s
    }
}

fn main() {
    let s = get_data();
    let mut floor = 0;
    let mut count = 1;
    let mut char_pos = 0;
    
    for c in s.chars() {
        if c.to_string() == "(" {
            floor += 1;
        } else if c.to_string() == ")" {
            floor -= 1;
        }
        
        if floor == -1 && char_pos == 0 {
            char_pos = count;
        }

        count += 1;
    }
    
    print!("Floor: {}\nChar pos: {}\n", floor, char_pos);
}