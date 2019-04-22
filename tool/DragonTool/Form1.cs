using DragonTool.Styles;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DragonTool
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        public void setStyles(dynamic control)
        {
            this.FormBorderStyle = FormBorderStyle.FixedToolWindow;
            this.MaximumSize = this.Size;

            BackColor = Colors.texticons;
            if (control.GetType() == typeof(Panel))
                BackColor = Colors.primary;

            this.BackColor = Colors.lightprimary;
            foreach (Control item in control.Controls)
            {
                item.ForeColor = Colors.primarytext;
                if (item.GetType() == typeof(Button))
                {
                    item.BackColor = Colors.accent;
                    item.ForeColor = Colors.texticons;
                    ((Button)item).FlatStyle = FlatStyle.Popup;
                    ((Button)item).Font = new Font(Font.FontFamily, 12, FontStyle.Bold);
                }
                if (item.GetType() == typeof(DataGridView))
                {
                    ((DataGridView)item).BackgroundColor = Colors.lightprimary;
                    ((DataGridView)item).ForeColor = Colors.primarytext;
                    ((DataGridView)item).DefaultCellStyle.ForeColor = Colors.primarytext;
                    ((DataGridView)item).DefaultCellStyle.BackColor = Colors.lightprimary;
                    ((DataGridView)item).DefaultCellStyle.SelectionBackColor = Colors.darkprimary;
                    ((DataGridView)item).ColumnHeadersDefaultCellStyle.BackColor = Colors.darkprimary;
                    ((DataGridView)item).RowHeadersDefaultCellStyle.BackColor = Colors.darkprimary;
                }
                if (item.GetType() == typeof(TextBox))
                {
                    ((TextBox)item).BorderStyle = BorderStyle.None;
                    ((TextBox)item).BackColor = control.BackColor;
                    PictureBox downny = new PictureBox();
                    downny.Location = new Point(item.Location.X, item.Location.Y + item.Height + 2);
                    downny.Height = 2;
                    downny.Width = item.Width;
                    downny.BackColor = Colors.accent;
                    if (item.Visible == true)
                        control.Controls.Add(downny);
                    ((TextBox)item).GotFocus += delegate (object sender, EventArgs e)
                    {
                        downny.BackColor = Colors.darkprimary;
                    };
                    ((TextBox)item).LostFocus += delegate (object sender, EventArgs e)
                    {
                        downny.BackColor = Colors.accent;
                    };
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            setStyles(this);
        }

        Process p = new Process();

        private void btnRunServer_Click(object sender, EventArgs e)
        {
            string path = System.IO.Path.GetDirectoryName(Application.ExecutablePath);
            StreamReader read = new StreamReader(Path.Combine(path, "start.info"));
            string server = read.ReadToEnd();
            read.Close();
            try
            {
                p.Kill();
            }
            catch (Exception)
            {

            }
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.Verb = "runas";
            psi.FileName = "C:\\Windows\\System32\\cmd.exe";
            psi.Arguments = $"/k \"C:\\Program Files\\nodejs\\nodevars.bat\"& cd {path}& {server}";
            p.StartInfo = psi;
            try
            {
                p.Start();

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
         
        }
    }
}
